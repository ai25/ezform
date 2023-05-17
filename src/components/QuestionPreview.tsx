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
import Sidebar from "./Sidebar";
import FocalPoint from "./FocalPointPicker";

interface QuestionPreviewProps {
    question: Question;
    formId: string;
}
const QuestionPreview: React.FC<QuestionPreviewProps> = ({ question, formId }) => {
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
    const [scale, setScale] = useState(1);
    const elRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    function doResize() {
        if (!elRef.current || !wrapperRef.current) return;
        const elHeight = elRef.current.offsetHeight;
        const elWidth = elRef.current.offsetWidth;

        const wrapperHeight = wrapperRef.current.offsetHeight;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        console.log(wrapperWidth, elWidth, elWidth / wrapperWidth);

        const newScale = Math.min(elWidth / wrapperWidth, elHeight / wrapperHeight) * 1.6;

        setScale(Math.max(0.5, Math.min(1, newScale)));
    }

    useEffect(() => {
        doResize();

        function handleResize() {
            doResize();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (!form) return null;
    if (!form.design) {
        updateForm(formId, { design: design });
        return null;
    }
    const progress = 67;

    return (
        <Layout className="relative min-w-0 flex-1 overflow-hidden">
            <div className="relative z-[9999] h-0 w-full">
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
            <div ref={wrapperRef} className="flex h-full w-full items-center justify-center p-2 py-12 ">
                <div
                    style={{ ...styles.form, backgroundColor: design.backgroundColor, transform: `scale(${scale})` }}
                    className={`relative flex shadow-lg`}
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
                        style={
                            {
                                // ...styles.imageContainer,
                                // objectFit: question.imageFit,
                                // objectPosition: question.imagePosition,
                            }
                        }
                        className={`${question.imageUrl ? "" : "hidden"} `}
                    >
                        <Image
                            className={``}
                            style={{
                                objectFit: question.imageFit,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                            unoptimized
                            src={question.imageUrl}
                            alt={question.imageAltText ?? ""}
                            fill
                        />
                    </div>
                    {!isImageEditing && (
                        <div
                            ref={elRef}
                            style={{ transform: `scale(${scale})` }}
                            className="z-10 flex w-full max-w-full items-center justify-center overflow-hidden"
                        >
                            {questionContent}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default QuestionPreview;
