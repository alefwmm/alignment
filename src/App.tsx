import React, { useState } from 'react';
import { Radio, Select } from 'antd';

import 'antd/dist/antd.less';

import './layout.scss';
import './App.css';

type HorizontalXAlign =
  'left' | 'center' | 'right' | 'between' | 'around' | 'evenly' | 'stretch';

type HorizontalYAlign = 'top' | 'middle' | 'bottom' | 'stretch';

type HorizontalWrap =
  'no-wrap' | 'wrap' | 'wrap-top' | 'wrap-middle' | 'wrap-bottom' |
  'wrap-stretch' | 'wrap-between' | 'wrap-around' | 'wrap-evenly';

interface HorizontalLayout {
  direction: 'horizontal',
  xAlign: HorizontalXAlign,
  yAlign: HorizontalYAlign,
  wrap: HorizontalWrap
}

type VerticalXAlign =
  'left' | 'center' | 'right' | 'stretch';

type VerticalYAlign =
  'top' | 'middle' | 'bottom' | 'between' | 'around' | 'evenly' | 'stretch';

type VerticalWrap =
  'no-wrap' | 'wrap' | 'wrap-left' | 'wrap-center' | 'wrap-right' |
  'wrap-stretch' | 'wrap-between' | 'wrap-around' | 'wrap-evenly';

type Breakpoint =
  'all'| 'mobile' | 'tablet' | 'desktop' | 'mobile-tablet' | 'tablet-desktop';

interface VerticalLayout {
  direction: 'vertical',
  xAlign: VerticalXAlign,
  yAlign: VerticalYAlign,
  wrap: VerticalWrap
}

type Layout = (HorizontalLayout | VerticalLayout) & {
  breakpoint: Breakpoint
};

type Direction = Layout['direction'];

interface PropertyConfigProps<T> {
  title?: string,
  value: T,
  setValue: (value: T) => void,
  values: T[]
}

const PropertyConfig = <T,>(
  { title='', value, setValue, values }: PropertyConfigProps<T>
) => (
    <div>
      <h3>{ title }</h3>
      <Radio.Group value={value} onChange={e => setValue(e.target.value)}>
        { values.map((v, i) =>
          <Radio.Button key={i} value={v}>{v}</Radio.Button>
        ) }
      </Radio.Group>
    </div>
);

const generateClassName = (layout: Layout): string => {
  const breakpointPrefix: { [K in Breakpoint]: string } = {
    mobile: 'm-',
    tablet: 't-',
    desktop: 'd-',
    "mobile-tablet": 'mt-',
    "tablet-desktop": 'td-',
    all: ''
  };

  const classNames = [
    layout.direction, `${layout.xAlign}-${layout.yAlign}`, layout.wrap];

  const prefix = breakpointPrefix[layout.breakpoint];

  return classNames.map(cn => prefix + cn).join(' ');
};

interface LayoutConfigProps {
  onChange?: (config: Layout) => void
}

const LayoutConfig = ({ onChange=(() => void(0)) }: LayoutConfigProps) => {
  const breakpoints: Breakpoint[] = [
    'all', 'desktop', 'tablet', 'mobile', 'mobile-tablet', 'tablet-desktop'];
  const [breakpoint, setBreakpoint] = useState(breakpoints[0]);

  const directions: Direction[] = ['horizontal', 'vertical'];
  const [direction, setDirection] = useState(directions[0]);

  const hXAlignments: HorizontalXAlign[] = [
    'left', 'center', 'right', 'between', 'around', 'evenly', 'stretch'];
  const [hXAlignment, setHXAlignment] = useState(hXAlignments[0]);

  const hYAlignments: HorizontalYAlign[] =
    ['top', 'middle', 'bottom', 'stretch'];
  const [hYAlignment, setHYAlignment] = useState(hYAlignments[0]);

  const hWraps: HorizontalWrap[] = [
    'no-wrap', 'wrap', 'wrap-top', 'wrap-middle', 'wrap-bottom', 'wrap-stretch',
    'wrap-between', 'wrap-around', 'wrap-evenly'];
  const [hWrap, setHWrap] = useState(hWraps[0]);

  const vXAlignments: VerticalXAlign[] = ['left', 'center', 'right', 'stretch'];
  const [vXAlignment, setVXAlignment] = useState(vXAlignments[0]);

  const vYAlignments: VerticalYAlign[] = [
    'top', 'middle', 'bottom', 'between', 'around', 'evenly', 'stretch'];
  const [vYAlignment, setVYAlignment] = useState(vYAlignments[0]);

  const vWraps: VerticalWrap[] = [
    'no-wrap', 'wrap', 'wrap-left', 'wrap-center', 'wrap-right', 'wrap-stretch',
    'wrap-between', 'wrap-around', 'wrap-evenly'];
  const [vWrap, setVWrap] = useState(vWraps[0]);

  const layout: Layout = direction === 'horizontal'
    ? { breakpoint, direction, xAlign: hXAlignment, yAlign: hYAlignment, wrap: hWrap }
    : { breakpoint, direction, xAlign: vXAlignment, yAlign: vYAlignment, wrap: vWrap };

  const className = generateClassName(layout);

  return (
    <div>
      <PropertyConfig
        title='Breakpoint'
        value={breakpoint}
        setValue={setBreakpoint}
        values={breakpoints} />

      <PropertyConfig
        title='Direction'
        value={direction}
        setValue={setDirection}
        values={directions} />

      { direction === 'horizontal' ? (
        <>
          <PropertyConfig
            title='Horizontal X Alignment'
            value={hXAlignment}
            setValue={setHXAlignment}
            values={hXAlignments} />

          <PropertyConfig
            title='Horizontal Y Alignment'
            value={hYAlignment}
            setValue={setHYAlignment}
            values={hYAlignments} />

          <PropertyConfig
            title='Horizontal Wrap'
            value={hWrap}
            setValue={setHWrap}
            values={hWraps} />
        </>
      ) : (
        <>
          <PropertyConfig
            title='Vertical X Alignment'
            value={vXAlignment}
            setValue={setVXAlignment}
            values={vXAlignments} />

          <PropertyConfig
            title='Vertical Y Alignment'
            value={vYAlignment}
            setValue={setVYAlignment}
            values={vYAlignments} />

          <PropertyConfig
            title='Vertical Wrap'
            value={vWrap}
            setValue={setVWrap}
            values={vWraps} />
        </>
      ) }
      <h1>{ className }</h1>
      { direction === 'horizontal' ? (
        <div className={'container-h ' + className}>
        <div className='d1' />
        <div className='d2' />
        <div className='d3' />
    </div>
      ) : (
        <div className={'container-v ' + className}>
          <div className='d1' />
          <div className='d2' />
          <div className='d3' />
      </div>
      )}


    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Alignment</h1>
      <LayoutConfig />
    </div>
  );
}

export default App;
