import { useAllPostQuery, useDeletePostMutation, useSearchPostsQuery } from "@/api/posts/postsApi";
import Link from "next/link";
import React, { useState } from "react";

export default function AllPosts() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data:allPosts, error, isLoading } = useAllPostQuery();
    const [deletePost, deletePostResult] = useDeletePostMutation()
    const { data: searchPosts, error: searchError, isLoading: searchIsLoading } =useSearchPostsQuery(searchTerm)
    // console.log(deletePostResult);    
    const handleDelete = (id: string ) => {
        deletePost({id})
    }
    const postsToDisplay = searchTerm ? searchPosts?.data : allPosts?.data;

    return (
        <>
            <section className="w-[80%] m-auto">
                <h2 className="text-3xl font-bold text-center mb-5">
                    All Posts
                </h2>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-5 p-2 border rounded w-full"
                />

                {postsToDisplay?.map(
                    (allData: {
                        id: React.Key | null | undefined;
                        attributes: {
                            files: any;
                            image: {
                                data: {
                                    attributes: {
                                        formats: {
                                            thumbnail: any;
                                            url: any;
                                        };
                                    };
                                };
                            };
                            title: string;
                            description: string;
                        };
                    }) => (
                        <div key={allData.id} className=" mb-5">
                            <div className="flex flex-col items-center bg-transparent border-none rounded-lg  md:flex-row md:max-w-[100%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img
                                    className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                    src={allData?.attributes?.files}
                                    alt="Blog Post"
                                />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {allData?.attributes.title}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {allData?.attributes.description}
                                    </p>
                                    <Link
                                        href={`/postupdate/${allData.id}`}
                                        className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded text-center"
                                    >
                                        Update
                                    </Link>
                                    <button
                                            onClick={() => handleDelete(allData.id as string)}
                                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>

                                </div>
                            </div>
                        </div>
                    )
                )}
            </section>
        </>
    );
}
