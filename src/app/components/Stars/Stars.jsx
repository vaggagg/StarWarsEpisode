import { useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function StarComponent ( { rating } ) {
    return <Rating initialValue={ rating } iconsCount={10} readonly={true}/>
}