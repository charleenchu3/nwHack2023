import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import './App.css'

export const Asset = () => {
    const [video, setVideo] = useState();
    const [uploadedVideos, setUploadedVideos] = useState([])
    const {
        mutate: createAsset,
        data: asset,
        status,
        progress,
        error,
    } = useCreateAsset(
        video
            ? {
                sources: [{ name: video.name, file: video }],
            }
            : null
    );
    const { data: metrics } = useAssetMetrics({
        assetId: asset?.[0].id,
        refetchInterval: 30000,
    });

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
            setVideo(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/*': ['*.mp4'],
        },
        maxFiles: 1,
        onDrop,
    });

    useEffect(() => {
        // if (status === 'success') setUploadedVideos(() => prev.push(asset))
        //}, [status])
        if (status === 'success') setUploadedVideos(prev => [...prev, asset])
    }, [status])

    const isLoading = useMemo(
        () =>
            status === 'loading' ||
            (asset?.[0] && asset[0].status?.phase !== 'ready'),
        [status, asset],
    );

    const progressFormatted = useMemo(
        () =>
            progress?.[0].phase === 'failed'
                ? 'Failed to process video.'
                : progress?.[0].phase === 'waiting'
                    ? 'Waiting...'
                    : progress?.[0].phase === 'uploading'
                        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
                        : progress?.[0].phase === 'processing'
                            ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
                            : null,
        [progress],
    );

    return (
        <div style={{ width: '500px', margin: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '70% 25%', columnGap: '5px', paddingRight: "20px", marginBottom: "20px" }}>
                <div {...getRootProps()}>
                    <Input style={{ paddingTop: '10px' }} type="file" onChange={(e) => setVideo(e.target.files[0])} />
                    {error?.message && <p>{error.message}</p>}
                </div>
                <Button
                    onClick={() => {
                        createAsset?.();
                    }}
                    disabled={isLoading || !createAsset}
                >
                    Upload
                </Button>
                <p style={{ paddingLeft: '10px' }}>Select a video file to upload</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                {uploadedVideos && uploadedVideos.map((video) =>
                    <Player title={video[0].name} playbackId={video[0].playbackId} />
                )}
            </div>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                {video && <p>{video.name}</p>}{metrics?.metrics?.[0] && (
                    <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
                )}
                {progressFormatted && <p>{progressFormatted}</p>}

            </div>
        </div>
    );
};

