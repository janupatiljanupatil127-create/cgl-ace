import { Request, Response } from 'express';
import { StudyMaterialService } from '../services/studyMaterial.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';
import { BadRequestError } from '../utils/errors';

export const createStudyMaterial = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  if (!req.file) {
    throw new BadRequestError('PDF file is required.');
  }

  const studyMaterial = await StudyMaterialService.createStudyMaterial(
    req.body,
    req.file.buffer,
    userId
  );

  sendCreated(res, 'Study material uploaded successfully', studyMaterial);
});

export const getStudyMaterials = catchAsync(async (req: Request, res: Response) => {
  const { subjectId, topicId, search } = req.query;

  const items = await StudyMaterialService.getStudyMaterials({
    subjectId: subjectId as string,
    topicId: topicId as string,
    search: search as string,
  });

  sendSuccess(res, 'Study materials retrieved successfully', items);
});

export const updateStudyMaterial = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await StudyMaterialService.updateStudyMaterial(id, req.body);
  sendSuccess(res, 'Study material updated successfully', item);
});

export const deleteStudyMaterial = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await StudyMaterialService.deleteStudyMaterial(id);
  sendSuccess(res, 'Study material deleted successfully');
});
