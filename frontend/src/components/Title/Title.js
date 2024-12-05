import React from 'react';

export default function Title({ title, fontSize, margin, color = '#616161'}) {
  return <h1 style={{ fontSize, margin, color}}>{title}</h1>;
}