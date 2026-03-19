"use client";
import Reac, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { SquarePlus } from "lucide-react";
import { toast } from "react-toastify";
import { addUserToProject } from "../actions";
import { useUser } from "@clerk/nextjs";

const page = () => {

    const [inviteCode, setInviteCode] = useState("")
    const {user} = useUser()
    const email = user?.primaryEmailAddress?.emailAddress as string

    const handleSubmit = async () => {
        try {
            if(inviteCode != "") {
                await addUserToProject(email, inviteCode)
                toast.success("Vous avez rejoint le projet avec succès")
            } else {
                toast.error("Veuillez entrer un code d'invitation")
            }
        } catch (error) {
            toast.error('Code invalide ou vous appartenez déjà à ce projet')
        }
    }

    return (
        <Wrapper>
            <div className="flex">
                <div className="mb-4">
                    <input
                        value={inviteCode}
                        onChange = {(e) => setInviteCode(e.target.value)}
                        type="text"
                        placeholder="Code d'invitation"
                        className="w-full p-2 input input-bordered"/>
                </div>
                <button className="btn btn-primary ml-4" onClick={handleSubmit}>
                    Rejoindre <SquarePlus className="w-4"/>
                </button>
            </div>
        </Wrapper>
    )
}

export default page