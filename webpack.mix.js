let mix = require('laravel-mix');

mix.js('resources/script/app.js', 'public/script/app.js');


mix.sass('resources/styles/app.scss', 'public/styles/app.css');