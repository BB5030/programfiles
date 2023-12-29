.movies .movie{
    background-color: white;
    margin-bottom: 70px;
    font-weight: 300;
    padding: 20px;
    border-radius: 5px;
    color: #adaeb9;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
                0 8px 16px -8px rgba(0, 0, 0, 0.3),
                0 -6px 16px -6px rgba(0, 0, 0, 0.025);
}

.movies .movie a{
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 2fr; 
    grid-gap: 100px;
    text-decoration: none;
    color: inherit;
}

.movie .img{
    position: relative;
    top: -50px;
    max-width: 150px;
    width: 100%;
    margin-right: 30px;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
                0 8px 16px -8px rgba(0, 0, 0, 0.3),
                0 -6px 16px -6px rgba(0, 0, 0, 0.025);
}

.movie .movie__title,
.movie .movie__year{
    margin: 0;
    font-weight: 300;
}

.movie .movie__title{
    margin-bottom: 5px;
    font-size: 24px;
    color: #2c2c2c;
}

.movie .movie__genres{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0px;
}

.movie__genres li,
.movie .movie__year{
    margin-right: 10px;
    font-size: 14px;
}
