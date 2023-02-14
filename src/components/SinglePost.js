import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url/";
import SanityBlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source)
}

export default function SinglePost() {
    const [postData, setPostData] = useState(null)
    const { slug } = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image
        }`).then((data) => setPostData(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!postData) return <div> Loading...</div>

    return (
        <main className="bg-gray-200 min-h-screen p-12">
            <article className="container shadow-lg mx-auto bg-green-100 rounded-lg">
                <header className="relative">
                    <div className="absolute h-full w-full items-center p-8 justify-center">
                        <div className="bg-white bg-opacity-75 rounded p-12">
                            <h1 className="cursive text-3xl lg:text-6xl mb-4">{postData.title}</h1>
                            <div className="flex jostify-center text-gray-800">
                                <img src={urlFor(postData.authorImage).url() }
                                alt={postData.name}
                                className="w-10 h-10 rounded-full"/>
                                <p className="cursive flex items-center pl-2 text-2xl">{postData.name}</p>
                            </div>
                        </div>
                    </div>
                    <img 
                    alt={postData.title}
                    className="w-full object-cover rounded-t"
                    style={{height: "400px"}}
                    src={urlFor(postData.mainImage).url()}/>
                    <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                        <SanityBlockContent blocks={postData.body} projectId="q2u8iugr" dataset="production"/>
                        </div>
                </header>
            </article>
        </main>
    )
}