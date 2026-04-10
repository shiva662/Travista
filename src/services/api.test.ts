import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reviewsAPI } from './api';

describe('reviewsAPI', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls place reviews endpoint with sort query', async () => {
    const mockJson = vi.fn().mockResolvedValue({ success: true, reviews: [] });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: mockJson }));

    await reviewsAPI.getPlaceReviews('abc123', 'highest');

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/reviews/abc123?sort=highest');
  });
});
