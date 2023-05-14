import { IncomingForm, type File } from "formidable";
import fs from "fs";
import { type NextApiRequest, type NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false,
    },
};

const post = (req: NextApiRequest, res: NextApiResponse): void => {
    const form = new IncomingForm();
    form.parse(req, (err: Error, fields, files) => {
        if (err) throw err;
        if (!Array.isArray(files.file)) {
            if (!files.file) throw new Error("No file uploaded");
            saveFile(files.file)
                .then(() => {
                    res.status(201).send("");
                })
                .catch((error: Error) => {
                    throw error;
                });
        }
    });
};

const saveFile = async (file: File): Promise<void> => {
    const data = fs.promises.readFile(file.filepath);
    await fs.promises.writeFile(`./${file.originalFilename ?? "file"}`, await data);
    await fs.promises.unlink(file.filepath);
};

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    switch (req.method) {
        case "POST":
            post(req, res);
            break;
        case "PUT":
            console.log("PUT");
            break;
        case "DELETE":
            console.log("DELETE");
            break;
        case "GET":
            console.log("GET");
            break;
        default:
            res.status(404).send("");
    }
};
export default handler;
