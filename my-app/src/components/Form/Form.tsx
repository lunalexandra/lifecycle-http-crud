import { useState } from "react";
import img from "/src/assets/img/img1.png"
import classes from "./form.module.css";

interface FormProps {
    onSubmit: (text: string) => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [text, setText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;
        console.log(`передали ${text}`)
        onSubmit(text);
        setText(""); // Очищаем поле ввода
    };

    return (
        <form className={classes["new-note-container"]} onSubmit={handleSubmit}>
            <h2 className={classes.title}>Новая Заметка</h2>
            <textarea
                name="text"
                className={classes.textarea}
                value={text}
                onChange={handleChange}
            ></textarea>
            <button type="submit" className={classes["send-btn"]}>
            <img src={img} alt="Send" style={{ height: '24px' }} /> 
            </button>
        </form>
    );
};
