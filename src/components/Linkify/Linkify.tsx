import React from 'react'
import DOMPurify from 'dompurify'

type Props = {
    children: string
}

const Linkify = ({children}: Props) => {
    const isUrl = (word: string) => {
        const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
        return word.match(urlPattern)
    }

    const addMarkup = (word: string)=> {
        return isUrl(word) ? 
            `<a href="${word}">${word}</a>`:  
            word
    }

    const words = children.split(' ')
    const formatedWords = words.map((w, i) => addMarkup(w))
    const html = DOMPurify.sanitize(formatedWords.join(' '))
    return (<span dangerouslySetInnerHTML={{__html: html}} />)
}

export default Linkify