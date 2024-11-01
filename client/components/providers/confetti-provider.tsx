"use client"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import ReactConfetti from "react-confetti"

export const ConfettiProvider = ({ children }: { children: React.ReactNode }) => {
    const confetti = useConfettiStore()

    return (
        <>
            {confetti.isOpen && (
                <ReactConfetti
                    className="pointer-events-none z-[100]"
                    numberOfPieces={500}
                    recycle={false}
                    onConfettiComplete={() => {
                        confetti.onClose()
                    }}
                />
            )}
            {children}
        </>
    )
}