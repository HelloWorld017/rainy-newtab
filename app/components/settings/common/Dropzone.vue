<template>
	<label
		class="Dropzone"
		:class="{ 'Dropzone--drop': isDragOver }"
		@dragover="onDragOver"
		@dragleave="onDragLeave"
		@drop="onDrop"
	>
		<input class="Dropzone__upload" type="file" ref="upload" @change="handleUploadDialog" />
		<PlusIcon class="Dropzone__icon" width="1em" height="1em" />
		<slot />
	</label>
</template>

<style lang="less" scoped>
	.Dropzone {
		cursor: pointer;
		border: 1px solid #404040;
		border-radius: 16px;
		color: #c1c1c1;
		box-sizing: border-box;
		outline: none;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 30px 10px;

		font-family: inherit;
		font-size: 16px;
		width: 100%;

		transition: all 0.4s ease;

		* {
			pointer-events: none;
		}

		&&--drop {
			border-color: #0064ff;
		}

		&__icon {
			font-size: 24px;
		}

		&__upload {
			position: absolute;
			visibility: hidden;
		}
	}
</style>

<script lang="ts" setup>
	import { PlusIcon } from 'lucide-vue-next';
	import { ref, useTemplateRef } from 'vue';

	const isDragOver = ref(false);

	const emit = defineEmits<{ upload: [File] }>();
	const handleUpload = (file: File) => emit('upload', file);
	const handleUploadTransfer = (dataTransfer: DataTransfer) => {
		const blob = Array.from(dataTransfer.items)
			.find(item => item.kind === 'file')
			?.getAsFile();

		if (blob) {
			handleUpload(blob);
		}
	};

	const uploadInput = useTemplateRef<HTMLInputElement>('upload');
	const handleUploadDialog = () => {
		const file = uploadInput.value?.files?.[0];
		if (file) {
			handleUpload(file);
			uploadInput.value.value = '';
		}
	};

	const handleDragEvent = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const onDragOver = (event: DragEvent) => {
		handleDragEvent(event);
		isDragOver.value = true;
	};

	const onDragLeave = (event: DragEvent) => {
		handleDragEvent(event);
		isDragOver.value = false;
	};

	const onDrop = (event: DragEvent) => {
		handleDragEvent(event);
		isDragOver.value = false;

		if (event.dataTransfer) {
			handleUploadTransfer(event.dataTransfer);
		}
	};
</script>
