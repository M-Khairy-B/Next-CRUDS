import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useGetPostQuery, useUpdatePostMutation, useUploadMediaMutation } from "@/api/posts/postsApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomeInput from "../../component/CustomeInputs/CustomeInput";
import CustomFileInput from "../../component/CustomeInputs/CustomFileInput";
import { IFormValues } from "../../Model/interfaceForm";
export default function PostUpdatePage() {
    const router = useRouter();
    const { id } = router.query;
    // console.log(id);
    
    const { data: post, isLoading, error } = useGetPostQuery(id as string);
    const [updatePost , updatePostResult] = useUpdatePostMutation();
    const [uploadMedia, uploadMediaResults] = useUploadMediaMutation();

    // console.log(post);
    // console.log(updatePostResult);
    

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        author: Yup.string().required("Author is required"),
        files: Yup.mixed().required("A file is required"),
    });

    const handleSubmit = async (
        values: IFormValues,
        { setSubmitting, resetForm }: any
    ) => {
        let fileUrl = "";

        if (values.files) {
            const formDataFile = new FormData();
            formDataFile.append("files", values.files);

            const uploadResponse:any = await uploadMedia(formDataFile).unwrap();
            fileUrl = `${uploadResponse[0]?.url}`;
        }

        const postData = {
            data: {
                title: values.title,
                description: values.description,
                author: values.author,
                files: fileUrl,
    
            }
        };

        updatePost({ id: id as string, data: postData }).then(() => {
            resetForm();
            router.push("/");
        });
    };

    return (
        <section className="w-[80%] m-auto">
            <h2 className="text-center mb-7 text-[32px]">Update Post</h2>
            <Formik
                initialValues={{
                    title: post?.data?.attributes.title || "",
                    description: post?.data?.attributes.description || "",
                    author: post?.data?.attributes.author || "",
                    files: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
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
                            {isSubmitting ? "Submitting..." : "Update"}
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}
