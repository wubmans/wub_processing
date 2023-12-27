function colorsFromUrl(url)
{
    colors = url.replace('https://coolors.co/', '').split('-')

    return colors.map(c => { return color('#' + c); })
}