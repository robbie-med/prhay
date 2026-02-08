window.Prhay = window.Prhay || {};

/**
 * Converts a lucide icon definition (array of SVG element tuples)
 * into a React functional component.
 *
 * Usage:
 *   const Home = Prhay.icon(lucide.Home);
 *   <Home size={24} className="text-blue-500" />
 */
window.Prhay.icon = (iconNode) => {
    return ({ size = 24, className = '', ...rest }) =>
        React.createElement('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: className,
            ...rest
        }, ...(iconNode || []).map(([tag, attrs], i) =>
            React.createElement(tag, { key: i, ...attrs })
        ));
};
