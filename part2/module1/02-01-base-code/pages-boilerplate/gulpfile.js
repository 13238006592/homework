// 实现这个项目的构建任务
const { dest, src, parallel, series, watch } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const del = require('del')
const browserSync = require('browser-sync')
const bs = browserSync.create()
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass())
        .pipe(dest('tmp'))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('tmp'))
}

const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig())
        .pipe(dest('tmp'))
}

const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('gulp-dist'))
}
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('gulp-dist'))
}
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('gulp-dist'))
}

const clean = () => {
    return del(['gulp-dist', 'tmp'])
}
const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    // watch('src/assets/images/**',image)
    // watch('src/assets/fonts/**',font)
    // watch('public/**',extra)
    watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)
    bs.init({
        files: 'tmp/**',
        server: {
            baseDir: ['tmp', 'src', 'public'],

            routes: {
                    '/node_modules': 'node_modules'
            },
        }
    })
}

const useref = () => {
    return src('tmp/*.html')
        .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin()))
        .pipe(dest('gulp-dist'))
}

const compile = parallel(style, script, page)
const build = series(clean, parallel(series(compile, useref), extra, image, font))
const dev = series(compile, serve)

module.exports = {
    clean,
    build,
    dev,
}