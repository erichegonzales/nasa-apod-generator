import { useState, useEffect } from 'react'
import Card from './Card'

const CardContainer = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3001/images");
            const req = await res.json()
            setCards(req)
        }

        fetchData().catch(console.error)
    }, [cards])

    const imageCards = cards.map((card) => {
        return (
            <Card
            key={card.id}
            card={card}
            setCards={setCards}
            />
        )
    })

    return imageCards
}

export default CardContainer