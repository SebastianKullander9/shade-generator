import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Login from "./Login";
import { createClient } from "@/utils/supabase/client";
import type { User } from '@supabase/supabase-js'
import Projects from "./Projects";
import { useSearchParams } from "next/navigation";


export default function SideBar({ id, projectName, scrollToShades }: { id: string, projectName: string, scrollToShades: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");

    useEffect(() => {
        console.log("Project NAME IN SIDEBAR: ", projectName)
        const getUser = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        }

        getUser();
    }, [projectId, projectName])
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        console.log(user)
    }

    return (
        <div className={`fixed flex justify-center top-0 left-0 h-full w-64 bg-background shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col w-10/12">
                <div className="py-8">
                    <h2 className="text-xl font-bold text-headline">Your Projects</h2>
                </div>
                {user ? 
                    <div className="h-full">
                        <Projects id={id} projectName={projectName} scrollToShades={scrollToShades} />
                    </div> : 
                    <div className="flex flex-col justify-between h-full mb-8">
                        <div>
                            <p className="text-base text-text">To save or access projects you need to login</p>
                        </div>
                        <div>
                            <Login />
                        </div>
                    </div>
                }
            </div>
            <div onClick={toggleOpen} className="absolute bg-background right-[-30] rounded-br-xl rounded-tr-xl top-1/2 cursor-pointer">
                {isOpen ? <IoIosArrowBack size={32}/> : <IoIosArrowForward size={32}/>} 
            </div>
        </div>
    );
}