from abc import ABC, abstractmethod


class TryOnProvider(ABC):
    @abstractmethod
    async def infer(self, person_png: bytes, garment_png: bytes, mask_png: bytes | None) -> bytes:
        """Return synthesized image bytes (PNG preferred)."""
        raise NotImplementedError
