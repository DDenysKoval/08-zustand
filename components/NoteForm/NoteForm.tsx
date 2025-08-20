"use client"
import css from "./NoteForm.module.css"
import { useId } from "react";
import type { NewNote } from "../../types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";


interface NoteFormProps {
  mutation: (note: NewNote) => void;
  isPending: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onClose: () => void;
}

// interface OrderFormValues {
//   title: string;
//   content: string;
//   tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
// }

// const initialValues: OrderFormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// }

// const OrderFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string()
//     .max(500, "Content is too long"),
//   tag: Yup.string()
//     .oneOf(["Todo" , "Work" , "Personal" , "Meeting" , "Shopping"], "Invalid tag")
//     .required("Choose note's tag")
// })



export default function NoteForm({ mutation, isPending, onChange, onClose }:NoteFormProps) {
  const fieldId = useId();
  const { draft, clearDraft} = useNoteDraftStore();

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as unknown as NewNote;
    if (data.title.trim().length === 0) {
      alert("Please enter note's title")
    } else if (data.content.trim().length === 0) {
      alert("Please enter note's content")
    }
    mutation(data)
    clearDraft()
  }

  return (
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
            defaultValue={draft.title}
            onChange={onChange}
          />
        </div>
  
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft.content}
            onChange={onChange}
          />
        </div>
  
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
            defaultValue={draft.tag}
            onChange={onChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
  
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </form>
  )
}
