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
    }, authorSelect:function(authors, author_id){
        var tag ='';
        var i=0;
        while(i < authors.length){
            var selected ='';
            if(authors[i].id === author_id){
                selected = `selected`;
            }
            tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
            i++;
        }
        return `
            <p>
                <select name="author">${tag}</select>
            </p>
        `
    }
}

module.exports = calTemplate;