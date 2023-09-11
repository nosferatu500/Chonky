import React from 'react';

import { ChonkyIconProps } from '../../types/icons.types';

export const ChonkyIconPlaceholder: React.FC<ChonkyIconProps> = () => {
    // This component should not be rendered unless the user has misconfigured Chonky
    const title =
        'No icon component found. Please follow Chonky installation instructions to ' +
        'provide a pre-made icon component (or a custom icon).';
    return <span title={title}>⚠️</span>;
};
