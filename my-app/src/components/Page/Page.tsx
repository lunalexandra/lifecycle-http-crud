import { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import { Form } from "../Form/Form";
import classes from "./page.module.css";

export const Page = () => {
    const [cards, setCards] = useState<{ id: number; content: string }[]>([]);

    const fetchNotes = async () => {
        const response = await fetch('http://localhost:7070/notes');
        if (response.ok) {
            const data = await response.json();
            setCards(data);
        }
    };

    useEffect(() => {
    fetchNotes();
    }, []);

    const handleFormSubmit = async ( text: string ) => {
        try {
            await fetch('http://localhost:7070/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 0,
                    content: text,
                }),
            });
            await fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:7070/notes/${id}`, {
                method: 'DELETE',
            });
            await fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefresh = async () => {
        await fetchNotes();
    };

    return (
        <>
        <h1>Notes</h1>
            <button onClick={handleRefresh} className={classes.refreshBtn}>
                Обновить
            </button>
            {cards.map(item => (
                <Card key={item.id} text={item.content} onDelete={() => handleDelete(item.id)} />
            ))}
            <Form onSubmit={handleFormSubmit} />
        </>
    );
};
