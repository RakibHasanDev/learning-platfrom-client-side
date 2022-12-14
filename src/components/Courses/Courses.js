// import { useQuery } from '@tanstack/react-query';
import { useQuery } from 'react-query';
import React from 'react';
import Loading from '../Loading/Loading';
import SingleCourse from '../SingleCourse/SingleCourse';
import LeftSide from './LeftSide';

const Courses = () => {
    // const courses = useLoaderData();
    // console.log(courses)
    window.scrollTo(0, 0);

    const url = 'https://learn-with-rakib-server-mrmerndeveloper.vercel.app/courses'
    const { data: courses = [], isLoading,  } = useQuery({
        queryKey: ['courses',],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }

    })

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="grid  grid-cols-1 lg:grid-cols-4 w-11/12 md:w-full mx-auto  my-10 md:my-0">
            <div className="col-span-1 p-4 shadow-2xl md:bg-indigo-300  rounded-r-lg">
                {
                    courses.map((course, index) => <LeftSide
                        course={course}
                    key={index}>
                        
                    </LeftSide>)
               }
                </div>
            <div className="col-span-3  flex justify-center ">

                <div className="grid md:grid-cols-2 md:w-11/12 mx-auto lg:grid-cols-3 gap-3 mt-10">

                    {
                        courses.map(course => <SingleCourse
                            key={course.id}
                        course={course}>
                            
                        </SingleCourse>)
                   }

                

                </div>

                </div>
        </div>
    );
};

export default Courses;