import { Button, Layout, Modal } from "antd";
import Image from "next/image";
import React, { useRef, useState, useEffect, CSSProperties, useMemo } from "react";
import { FaDesktop, FaPhone, FaTablet } from "react-icons/fa";
import type Question from "../models/Question";
import QuestionEditor from "./QuestionEditor";
import { BsPhoneFill } from "react-icons/bs";
import QuestionContent from "./QuestionContent";
import { type TextQuestion } from "../models/TextQuestion";
import RankingQuestionContent from "./RankingQuestionContent";
import { type RankingQuestion } from "../models/RankingQuestion";
import useBuilderStore from "../store/builder-store";
import { Design } from "~/models/Design";
import { useStyledElement } from "~/hooks/useStyledElement";

interface QuestionPreviewProps {
    question: Question;
    formId: string;
}
const QuestionPreview: React.FC<QuestionPreviewProps> = ({ question, formId }) => {
    const [showEditor, setShowEditor] = React.useState(true);
    const { forms, updateForm } = useBuilderStore();
    const form = forms[formId];
    const [design, setDesign] = React.useState<Design>(form?.design ?? new Design());
    const questionContent = React.useMemo(() => {
        switch (question.type) {
            case "text":
                return <QuestionContent design={design} question={question as TextQuestion} />;
            case "ranking":
                return <RankingQuestionContent design={design} question={question as RankingQuestion} />;

            default:
                return null;
        }
    }, [question, design]);
    useEffect(() => {
        if (form) {
            setDesign(form.design ?? new Design());
        }
    }, [form]);
    const { styles, setAspectRatio } = useStyledElement(question);

    const [isImageEditing, setIsImageEditing] = React.useState(false);
    if (!form) return null;
    if (!form.design) {
        updateForm(formId, { design: design });
        return null;
    }
    const progress = 67;

    return (
        <Layout className="flex items-center justify-center overflow-hidden bg-blue-400 px-2">
            <div className="flex h-full w-full justify-between bg-red-500 ">
                <div className="flex w-full items-center justify-center bg-green-500 p-2">
                    <div
                        style={{ ...styles.form, backgroundColor: design.backgroundColor }}
                        className={`relative flex h-56 justify-evenly sm:h-96 md:h-[30rem]`}
                    >
                        <div
                            style={{
                                width: `${progress}%`,
                                backgroundColor: design.buttonColor,
                                borderRadius: design.borderRadius,
                            }}
                            className="absolute left-0 top-0 z-20 h-1 "
                        ></div>
                        <div
                            style={{
                                ...styles.imageContainer,
                                objectFit: question.imageFit,
                                objectPosition: question.imagePosition,
                            }}
                            className={`${question.imageUrl ? "" : "hidden"} `}
                        >
                            <Image
                                className={` `}
                                style={{
                                    objectFit: question.imageFit,
                                }}
                                unoptimized
                                src={question.imageUrl}
                                alt={question.imageAltText ?? ""}
                                fill
                            />
                        </div>
                        {!isImageEditing && (
                            <div className="z-10 flex h-full max-w-min items-center justify-center">
                                {questionContent}
                            </div>
                        )}
                        {/* <Button onClick={() => setIsImageEditing(!isImageEditing)}>Edit Image</Button> */}
                    </div>
                </div>
                <div className="relative h-1 w-0 bg-red-500">
                    <div className="absolute right-2 top-2 flex flex-col items-center gap-2 p-2 text-2xl text-white ">
                        <button className="rounded bg-black/30 p-2" onClick={() => setAspectRatio("video")}>
                            <FaDesktop />
                        </button>
                        <button className="rounded bg-black/30 p-2" onClick={() => setAspectRatio("tablet")}>
                            <FaTablet />
                        </button>
                        <button className="rounded bg-black/30 p-2" onClick={() => setAspectRatio("phone")}>
                            <BsPhoneFill />
                        </button>
                    </div>
                </div>
                {showEditor && <QuestionEditor question={question} formId={formId} />}
            </div>
        </Layout>
    );
};

export default QuestionPreview;
