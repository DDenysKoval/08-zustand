"use client"
import NoteForm from "@/components/NoteForm/NoteForm";
import { createNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CreateNoteClient = () => {
  const router = useRouter()
  const { draft, setDraft} = useNoteDraftStore();
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value
    })
  }
  const handleClose = () => {
    router.back()
  }
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All")
    }
  })

  return (
    <NoteForm mutation={mutate} isPending={isPending} onChange={handleChange} onClose={ handleClose } />
  )
}

export default CreateNoteClient;