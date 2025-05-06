import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { AuthContext } from '../context/AuthProvider';
import userImg from "../assets/profile.jpg";
import { useContext } from 'react';


const SideBar = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
    return (
        <Sidebar aria-label="Sidebar with content separator example">
            <SidebarLogo href="/" img={user.photoURL ? user.photoURL : userImg} imgAlt="Flowbite logo">
                <p>
                    {
                        user.displayName ? user.displayName : "Admin"
                    }
                </p>
            </SidebarLogo>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem href="/admin/dashboard" icon={HiChartPie}>
                        Dashboard
                    </SidebarItem>
                    <SidebarItem href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
                        Upload Book
                    </SidebarItem>
                    <SidebarItem href="/admin/dashboard/manage" icon={HiInbox}>
                        Manage Books
                    </SidebarItem>
                    <SidebarItem href="#" icon={HiUser}>
                        Users
                    </SidebarItem>
                    <SidebarItem href="/login" icon={HiArrowSmRight}>
                        Sign In
                    </SidebarItem>
                    <SidebarItem href="/logout" icon={HiTable}>
                        Log Out
                    </SidebarItem>
                </SidebarItemGroup>
                
            </SidebarItems>
        </Sidebar>
    )
}

export default SideBar