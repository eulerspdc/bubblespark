'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardOption } from "./option-card";

const CreateFunnelViewPage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handleCardClick = (card: string) => {
        setSelectedCard(card);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Qual o objetivo do funil que você deseja criar?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                    className={`cursor-pointer ${selectedCard === "attract" ? "border-2 border-blue-500" : ""}`}
                    onClick={() => handleCardClick("attract")}
                >
                    <CardHeader>
                        <CardTitle>Atrair pessoas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Capte dados pessoais e disponibilize o produto</p>
                    </CardContent>
                </Card>
                <Card
                    className={`cursor-pointer ${selectedCard === "launch" ? "border-2 border-blue-500" : ""}`}
                    onClick={() => handleCardClick("launch")}
                >
                    <CardHeader>
                        <CardTitle>Lançar produto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Details for creating the second step of the funnel.</p>
                    </CardContent>
                </Card>
            </div>
            {selectedCard && (
                <div className="mt-14">
                    {/* <h2 className="text-xl font-bold mb-4">Opções adicionais</h2> */}
                    <div className="flex flex-row gap-4">
                        <CardOption/>
                        <CardOption/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateFunnelViewPage;