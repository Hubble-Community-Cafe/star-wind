import { getScreens, setScreenHandler, showStaticPoster } from './aurora';

type DesiredState = 'open' | 'last-call' | 'closed' | 'evacuation';

const CAROUSEL_HANDLER = process.env.AURORA_SCREEN_HANDLER_CAROUSEL ?? 'CarouselPosterHandler';
const STATIC_POSTER_HANDLER = process.env.AURORA_SCREEN_HANDLER_STATIC_POSTER ?? 'StaticPosterHandler';

const STATE_POSTER_IDS: Record<Exclude<DesiredState, 'open'>, number | undefined> = {
    'last-call': Number(process.env.AURORA_POSTER_LAST_CALL_ID) || undefined,
    'closed':    Number(process.env.AURORA_POSTER_CLOSED_ID)    || undefined,
    'evacuation': Number(process.env.AURORA_POSTER_EVACUATION_ID) || undefined,
};

export async function handleScreenStateChange(desiredState: DesiredState): Promise<void> {
    const screens = await getScreens();

    if (desiredState === 'open') {
        // Switch all screens back to the carousel handler
        await Promise.all(screens.map(screen => setScreenHandler(screen.id, CAROUSEL_HANDLER)));
        return;
    }

    const posterId = STATE_POSTER_IDS[desiredState];
    if (!posterId) {
        throw new Error(
            `No poster ID configured for state "${desiredState}". ` +
            `Set AURORA_POSTER_${desiredState.toUpperCase().replace('-', '_')}_ID in your environment.`
        );
    }

    // Switch all screens to the static poster handler, then show the poster
    await Promise.all(screens.map(screen => setScreenHandler(screen.id, STATIC_POSTER_HANDLER)));
    await showStaticPoster(posterId);
}
