import React, { type CSSProperties, useMemo } from "react";
import type Question from "~/models/Question";

type ElementConfig = {
    [K in Question["imageFit"]]?: {
        [K in Question["imagePosition"]]?: CSSProperties;
    } & {
        default: CSSProperties;
    };
} & {
    default:
        | CSSProperties
        | ({
              [K in Question["imagePosition"]]?: CSSProperties;
          } & {
              default: CSSProperties;
          });
};

type Config = Record<"video" | "tablet" | "phone", Record<string, ElementConfig>>;

const ASPECT_RATIO_CONFIG: Config = {
    video: {
        imageContainer: {
            cover: {
                center: {
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    position: "absolute",
                },
                default: {
                    width: "66.666667%",
                    height: "100%",
                    position: "relative",
                },
            },
            default: {
                width: "66.666667%",
                height: "100%",
                position: "relative",
            },
        },
        form: {
            default: {
                left: {
                    flexDirection: "row",
                    aspectRatio: "16/9",
                    width: "100%",
                },
                default: {
                    flexDirection: "row-reverse",
                    aspectRatio: "16/9",
                    width: "100%",
                },
            },
        },
    },
    tablet: {
        imageContainer: {
            cover: {
                center: {
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    position: "absolute",
                },
                default: {
                    width: "100%",
                    height: "66.666667%",
                    position: "relative",
                },
            },
            default: {
                width: "100%",
                height: "66.666667%",
                position: "relative",
            },
        },
        form: {
            default: {
                left: {
                    flexDirection: "column",
                    aspectRatio: "3/4",
                    height: "100%",
                },
                default: {
                    flexDirection: "column-reverse",
                    aspectRatio: "3/4",
                    height: "100%",
                },
            },
        },
    },
    phone: {
        imageContainer: {
            cover: {
                center: {
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    position: "absolute",
                },
                default: {
                    width: "100%",
                    height: "56.25%",
                    position: "relative",
                },
            },
            default: {
                width: "100%",
                height: "56.25%",
                position: "relative",
            },
        },
        form: {
            default: {
                left: {
                    flexDirection: "column",
                    aspectRatio: "9/16",
                    height: "100%",
                    maxHeight: "100%",
                },
                default: {
                    flexDirection: "column-reverse",
                    aspectRatio: "9/16",
                    height: "100%",
                    maxHeight: "100%",
                },
            },
        },
    },
};

type StyledElementHook = {
    setAspectRatio: React.Dispatch<React.SetStateAction<"video" | "tablet" | "phone">>;
    styles: { [key: string]: CSSProperties };
};

export const useStyledElement: (question: Question) => StyledElementHook = question => {
    const [aspectRatio, setAspectRatio] = React.useState<"video" | "tablet" | "phone">("video");

    const styles = useMemo(() => {
        const config = ASPECT_RATIO_CONFIG[aspectRatio];
        const keys = Object.keys(config);

        const getCSSProp = (
            source: ElementConfig | undefined,
            fit: Question["imageFit"],
            position: Question["imagePosition"],
        ): CSSProperties | undefined => {
            return (
                source?.[fit]?.[position] ||
                source?.[fit]?.default ||
                (source?.default as { [K in Question["imagePosition"]]?: CSSProperties })?.[position] ||
                (source?.default as { [K in Question["imagePosition"]]?: CSSProperties } & { default: CSSProperties })
                    ?.default
            );
        };

        const position = question.imagePosition;
        const fit = question.imageFit;

        return keys.reduce((acc, key) => {
            acc[key] = getCSSProp(config[key], fit, position) ?? (config[key]?.default as CSSProperties) ?? {};
            return acc;
        }, {} as { [key: string]: CSSProperties });
    }, [question, aspectRatio]);

    return { styles, setAspectRatio };
};
