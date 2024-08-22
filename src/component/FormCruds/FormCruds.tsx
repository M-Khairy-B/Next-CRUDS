import { useCreatePostMutation,useUploadMediaMutation,} from "@/api/posts/postsApi";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import CustomeInput from "../CustomeInputs/CustomeInput";
import CustomFileInput from "../CustomeInputs/CustomFileInput";
import { IFormValues } from "../../Model/interfaceForm";
import { IUploadResponse } from "../../Model/interfaceUpload";

export default function FormCruds() {
    
    const [createPost, createPostResults] = useCreatePostMutation();
    console.log(createPostResults);
    const [uploadMedia, uploadMediaResults] = useUploadMediaMutation();
    // console.log(uploadMediaResults);

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        author: Yup.string().required("Author is required"),
        files: Yup.mixed().required("A file is required"),
    });

    // useEffect(() => {
    //     if (uploadMediaResults.isSuccess && uploadMediaResults.data) {
    //         console.log("upload resonse", uploadMediaResults?.data[0]?.url);
    //     }
    // }, [uploadMediaResults]);

    const handleSubmit = async (
        values: IFormValues,
        { setSubmitting, resetForm }: any
    ) => {
        let fileUrl = "";

        if (values.files) {
            // console.log(values.files);
            const formDataFile = new FormData();
            formDataFile.append("files", values.files);

            const uploadResponse:any = await uploadMedia(formDataFile).unwrap();
            fileUrl = `${uploadResponse[0]?.url}`;
            resetForm();
        }

        const postData = {
            data: {
                title: values.title,
                description: values.description,
                author: values.author,
                files: fileUrl,
    
            }
        };
        await createPost({ data: postData }).unwrap();
        // resetForm();


};

    return (
        <>
            <section className="w-[80%] m-auto">
                <h2 className="text-center mb-7 text-[32px] ">CRUDS News</h2>
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        author: "",
                        files: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field
                                name="title"
                                type="text"
                                id="title"
                                placeholder="Title"
                                component={CustomeInput}
                            />
                            <Field
                                name="description"
                                type="text"
                                id="description"
                                placeholder="Description"
                                component={CustomeInput}
                            />
                            <Field
                                name="author"
                                type="text"
                                id="author"
                                placeholder="Author"
                                component={CustomeInput}
                            />
                            <Field
                                name="files"
                                component={CustomFileInput}
                                label="Upload your file"
                                description="Accepts SVG, PNG, JPG, or GIF (MAX. 800x400px)"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded mb-5"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    );
}
