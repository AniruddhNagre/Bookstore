import React from 'react'
import { Button, Label, TextInput, Textarea,} from "flowbite-react";
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';


const EditBooks = () => {
    const {id} = useParams()
    const {bookTitle, authorName, imageURL, bookDescription, bookPDFURL } = useLoaderData()
    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Romance",
        "Historical",
        "Biography",
        "Self-Help",
        "Health & Wellness",
        "Business",
        "Travel",
        "Children's Books",
        "Young Adult",
        "Education",
        "Science",
        "Technology",
        "Philosophy",
        "Religion & Spirituality",
        "Comics & Graphic Novels",
        "Art & Photography",
        "Cooking",
        "Poetry",
        "Drama"
    ];
    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imageURL = form.imageURL.value;
        const category = selectedBookCategory;
        const bookDescription = form.bookDescription.value;
        const bookPDFURL = form.bookPDFURL.value;

        const bookData = {
            bookTitle,
            authorName,
            imageURL,
            category,
            bookDescription,
            bookPDFURL
        }
        
        // update the book data
        fetch(`http://localhost:5000/book/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Book updated successfully')
                    form.reset()
                    window.location.href = 'http://localhost:5173/admin/dashboard/manage'; // Redirect to dashboard manage page
                }
            })
            .catch(err => console.log(err))

    }
    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>
            <form onSubmit={handleUpdate} className="flex lg:w-[1100px] flex-col flex-wrap gap-4">
                {/* first row   Book name*/}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="bookTitle" value='Book Title'><p className='text-black'>Book Title</p>
                            </Label>
                        </div>
                        <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" required defaultValue={bookTitle} />
                    </div>
                    {/* Author Name*/}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="authorName" value='Author Name'><p className='text-black'>Author Name</p>
                            </Label>
                        </div>
                        <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required defaultValue={authorName} />
                    </div>
                </div>
                {/* second row  Image*/}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="imageURL" value='Book Image URL'><p className='text-black'>Book Image URL</p>
                            </Label>
                        </div>
                        <TextInput id="imageURL" name='imageURL' type="text" placeholder="Book Image URL" required defaultValue={imageURL} />
                    </div>
                    {/* category */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="inputState" value='Book Category'><p className='text-black'>Book Category</p>
                            </Label>
                        </div>
                        <select id="inputState" name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                            {bookCategories.map((option) =>
                                <option key={option} value={option}>{option}</option>
                            )}
                        </select>
                    </div>
                </div>
                {/* third row  Book Description*/}
                <div className=''>
                    <div className="mb-2 block">
                        <Label htmlFor="bookDescription" value='Book Description'><p className='text-black'>Book Description</p>
                        </Label>
                    </div>
                    <Textarea id="bookDescription" name='bookDescription' className='w-full' placeholder="Write your book description..." required rows={6}  defaultValue={bookDescription}/>

                </div>
                {/* fourth row  Book PDF*/}

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="bookPDFURL" value='Book PDF URL'><p className='text-black'>Book PDF URL</p>
                        </Label>
                    </div>
                    <TextInput id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Book PDF URL" required  defaultValue={bookPDFURL}/>
                </div>

                <Button type="submit" className='mt-5'>Update Book</Button>


                {/* Book Price*/}
                {/* <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="bookPrice" value='Book Price'><p className='text-black'>Book Price</p>
                            </Label>
                        </div>
                        <TextInput id="bookPrice" name='bookPrice' type="number" placeholder="Book Price" required />
                    </div> */}

            </form>
        </div>
    )
}

export default EditBooks