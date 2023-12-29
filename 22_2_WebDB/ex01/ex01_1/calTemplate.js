var calTemplate = {
    HTML:function(title, list, body, control){
        return `
        <!doctype html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">1년 연중 일정 및 계획</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
    },
    list:function(months) {
        var list = '<ul>';
        var i=0;
        while(i<months.length){
            list = list + `<li><a href="/?id=${months[i].id}">${months[i].title}</a></li>`;
            i = i+1;
        }
        list = list + '</ul>';
        return list;
    }
}

module.exports = calTemplate;