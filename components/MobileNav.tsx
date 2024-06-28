'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '../constants'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image src="/icons/hamburger.svg" alt="menu icon" width={36} height={36} className='cursor-pointer sm:hidden' />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-dark-1'>
                    <Link href="/" className='flex items-center gap-1'>
                        <Image src='/icons/logo.svg' width={32} height={32} alt='Connect Space logo' className='max-sm:size-10' />
                        <p className='text-[25px] font-extrabold text-white'>Connect Space</p>
                    </Link>
                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex flex-col h-full gap-6 pt-16 text-white'>
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route;
                                    return (
                                        <SheetClose asChild key={item.route}>
                                        <Link
                                            href={item.route}
                                            key={item.label}
                                            className={cn('flex gap-4 items-center p-4 rounded-lg w-full', { 'bg-blue-1': isActive })}
                                        >
                                            <Image
                                                alt={item.label}
                                                src={item.imageUrl}
                                                height={20}
                                                width={20}
                                            />
                                            <p className='font-semibold'>{item.label}</p>
                                        </Link>
                                        </SheetClose>
                                    );
                                })
                                }
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav
