"use client";
import {useRouter} from 'next/navigation'
const Users = ({users}) => {

    const router = useRouter();

    return (
    <ul className='list-group mt-5'>
        {
            users.map((user) => (
    
            <li className='list-group-item d-flex justify-content-between align-items-center' key={user.id}
                onClick={() => {
                    router.push(`/users/${user.id}`) // This is the same as router.push({pathname: `/users/${user.id}`
                    }}
            >
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
            <img src={user.avatar}
                alt={user.first_name}
                style={{borderRadius: '50%'}}
             />
            </li>
    
            ))
        }
    </ul>
)
}

export default Users