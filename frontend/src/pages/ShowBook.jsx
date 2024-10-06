import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true); // Start loading as true
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                console.log(`Fetching book with ID: ${id}`);
                const response = await axios.get(`http://localhost:5555/books/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the book:", error);
                setLoading(false);
            }
        };

        if (id) { // Ensure that ID is defined before fetching
            fetchBook();
        } else {
            console.error("No ID found in params");
            setLoading(false);
        }
    }, [id]); // Include 'id' in the dependency array

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Title</span>
                        <span>{book.title || 'N/A'}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Author</span>
                        <span>{book.author || 'N/A'}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                        <span>{book.publishYear || 'N/A'}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                        <span>{book.createdAt ? new Date(book.createdAt).toString() : 'N/A'}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                        <span>{book.updatedAt ? new Date(book.updatedAt).toString() : 'N/A'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
