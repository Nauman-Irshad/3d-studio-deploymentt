from app.config import Settings, get_settings
from app.providers import PlaceholderTryOnProvider, RemoteTryOnProvider, TryOnProvider


def get_provider(settings: Settings | None = None) -> TryOnProvider:
    s = settings or get_settings()
    mode = (s.tryon_mode or "placeholder").lower().strip()
    if mode == "remote":
        return RemoteTryOnProvider(s.remote_tryon_url)
    if mode == "huggingface":
        if not s.remote_tryon_url:
            raise ValueError(
                "TRYON_MODE=huggingface requires REMOTE_TRYON_URL pointing to a HF Space / "
                "CatVTON HTTP endpoint (standard Inference API does not host CatVTON)."
            )
        return RemoteTryOnProvider(s.remote_tryon_url)
    return PlaceholderTryOnProvider()


async def run_try_on(
    person_png: bytes,
    garment_png: bytes,
    mask_png: bytes | None,
    settings: Settings | None = None,
) -> bytes:
    provider = get_provider(settings)
    return await provider.infer(person_png, garment_png, mask_png)
