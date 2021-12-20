import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import log from 'fancy-log'
import fs from 'fs'
import path from 'path'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'
import MjHydrate from "./components/MjHydrate";

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}

const watchedComponents = walkSync('./components')

const compile = () => {
  return gulp
    .src(path.normalize('components/**/*.js'))
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .on('error', (e) => {
      console.dir(error)
      log(e)
    })
    .pipe(gulp.dest('lib'))
    .on('end', () => {
      watchedComponents.forEach(compPath => {
        const fullPath = path.join(process.cwd(), compPath)
        delete require.cache[fullPath]
        registerComponent(require(fullPath).default)
      })
      MjHydrate.setData({
        user: {
          firstname: "John",
          lastname: "Doe",
          email: "john_doz@yopmail.com"
        },
        template: {
          level1: "level2",
          level2: "level3",
          level3: "level4",
        }
      })
      fs.readFile(path.normalize('./index.mjml'), 'utf8', (err, data) => {
        if (err) throw err
        const result = mjml2html(data, {beautify: true, data: {text: 'toto'}})
        fs.writeFileSync(path.normalize('./index.html'), result.html)
      })
    })
}

gulp.task('build', compile)

gulp.task('watch', () => {
  compile()
  return watch([path.normalize('components/**/*.js'), path.normalize('index.mjml')], compile)
})
