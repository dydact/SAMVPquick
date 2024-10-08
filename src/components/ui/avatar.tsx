import React from 'react'
import styled from 'styled-components'

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--background-light);
`

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const AvatarFallbackWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  font-weight: bold;
`

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <AvatarWrapper {...props} />
}

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <AvatarImg {...props} />
}

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <AvatarFallbackWrapper {...props} />
}