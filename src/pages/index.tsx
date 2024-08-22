import Image from "next/image";
import { useAllPostQuery } from "@/api/posts/postsApi";
import FormCruds from "@/component/FormCruds/FormCruds";
import AllPosts from "@/component/AllPosts/AllPosts";

export default function Home() {
    return (
        <>
            <FormCruds />
            <AllPosts/>
        </>
    );
}
