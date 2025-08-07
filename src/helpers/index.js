export const getSportStyle = sport => {
  const sportStyles = {
    Soccer: { color: '#1e8449', icon: '⚽' },
    Basketball: { color: '#d35400', icon: '🏀' },
    Motorsport: { color: '#922b21', icon: '🏎️' },
    'Ice Hockey': { color: '#2980b9', icon: '🏒' },
    'American Football': { color: '#6c4423', icon: '🏈' },
  };

  return sportStyles[sport];
};
