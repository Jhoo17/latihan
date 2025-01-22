import { Layers, Mountain, FileText, FlaskRoundIcon as Flask, Leaf, Map, Info } from 'lucide-react'

export const services = [
  {
    title: "Geological Mapping & Analysis",
    href: "/services/geological-mapping",
    description: "Comprehensive geological mapping and analysis services.",
    icon: Layers,
  },
  {
    title: "Laboratory Services",
    href: "/services/laboratory",
    description: "Advanced laboratory services for rock and mineral analysis.",
    icon: Flask,
  },
  {
    title: "Environmental Geoscience",
    href: "/services/environmental-geoscience",
    description: "Environmental studies and assessments for geological projects.",
    icon: Leaf,
  },
  {
    title: "Geospatial Solutions",
    href: "/services/geospatial-solutions",
    description: "GIS mapping, spatial analysis, and data visualization services.",
    icon: Map,
  },
  {
    title: "Technical Studies & Reporting",
    href: "/services/technical-studies",
    description: "Comprehensive data analysis and technical documentation.",
    icon: FileText,
  },
]

export const routes = [
  {
    path: '/services',
    label: 'Services',
    prefetchKey: 'services',
    prefetchFn: () => fetch('/api/services').then(res => res.json()),
    dropdownContent: services
  },
  {
    path: '/publications',
    label: 'Publications',
    prefetchKey: 'publications',
    prefetchFn: () => fetch('/api/publications').then(res => res.json())
  },
  {
    path: '/map',
    label: 'Interactive Map',
    prefetchKey: 'map',
    prefetchFn: () => Promise.resolve()
  },
  {
    path: '/blog',
    label: 'Blog',
    prefetchKey: 'posts',
    prefetchFn: () => fetch('/api/posts').then(res => res.json())
  },
  {
    path: '/about',
    label: 'About Us',
    prefetchKey: 'about',
    prefetchFn: () => Promise.resolve()
  },
  {
    path: '/contact',
    label: 'Contact',
    prefetchKey: 'contact',
    prefetchFn: () => Promise.resolve()
  }
] 