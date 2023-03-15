import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'صفحه اصلی',
    path: '/#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'کاربران',
        path: '/',
        icon: <RiIcons.RiUser6Fill
        />
      }
    ]
  },
  {
    title: 'هاب بیمه مرکزی',
    path: '/#',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
        {
          title: 'لاگ شرکت های بیمه',
          path: '/partyLogs',
          icon: <RiIcons.RiComputerFill />
        },
        {
          title: 'پرونده های هاب سلامت',
          path: '/patientBillSnapshot',
          icon: <RiIcons.RiComputerFill />
        }
      ]
  },
  {
    title: 'تنظیمات',
    path: '/test',
    icon: <RiIcons.RiSettings5Line />
  },
    {
    title: 'پیام ها',
    path: '/#',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'پیام 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'پیام 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'خروج',
    path: '/logout',
    icon: <RiIcons.RiLogoutBoxRLine
    />
  }
];
