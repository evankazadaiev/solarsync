import { render, screen } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import { MapPreview } from '../MapPreview';
import { vi } from 'vitest';

beforeAll(() => {
    Object.defineProperty(navigator, 'serviceWorker', {
        value: {
            ready: Promise.resolve({}),
        },
        configurable: true,
    });
});

vi.mock('react-leaflet', async () => {
    const actual = await vi.importActual('react-leaflet');
    return {
        ...actual,
        useMap: vi.fn(() => ({
            whenReady: (cb: () => void) => cb(),
            getZoom: () => 13,
            setZoom: vi.fn(),
        })),
    };
});

describe('MapPreview', () => {
    const lat = 51.505;
    const lng = -0.09;

    const renderWithMapContainer = (component: JSX.Element) => {
        return render(
            <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100px', width: '100px' }}>
                {component}
            </MapContainer>
        );
    };

    it('renders the tile layer', () => {
        renderWithMapContainer(<MapPreview lat={lat} lng={lng} />);
        expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
    });
});
