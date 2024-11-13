import { ComponentType } from 'react'

export type LoadComponent = () => Promise<{ default: ComponentType<any> }>
export type AnyProps = { [key: string]: any }
export type LoaderDefaultOptions = { delay: number; minimumLoading: number; }