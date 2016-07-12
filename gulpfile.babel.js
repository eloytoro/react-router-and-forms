require('babel-polyfill');
const requiredir = require('requiredir');
const gulp = require('gulp');

const modules = requiredir('./gulp');

Object.keys(modules).forEach(module => {
  const tasks = modules[module];
  Object.keys(tasks).forEach(fnName => {
    const taskFn = tasks[fnName];
    const taskName = fnName === 'default' ? module : `${module}:${fnName}`;
    gulp.task(taskName, taskFn);
  });
});
