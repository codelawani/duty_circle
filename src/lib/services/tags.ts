import { Tag } from "@prisma/client";
import prisma from "../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Service for interacting with tags table.
 */
class TagService {
  /**
   * Creates or finds multiple tags.
   * @param tagNames - Array of tag names.
   * @returns Promise that resolves to an array of tags.
   */
  async createorFindMulti(tagNames?: Array<string>) {
    tagNames = tagNames?.filter((name) => !!name);
    const tags = tagNames
      ? await Promise.all(
          tagNames.map(async (name) => {
            let tag;
            try {
              tag = await this.find(name);
              if (!tag) {
                tag = await prisma.tag.create({
                  data: { name },
                });
              }
            } catch (err) {
              if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === "P2002"
              ) {
                tag = await this.find(name);
              } else {
                throw err;
              }
            }
            return tag;
          })
        )
      : [];
    return tags.filter((tag) => tag?.id) as Tag[];
  }

  /**
   * Finds a tag by name.
   * @param name - Name of the tag to find.
   * @returns Promise that resolves to the found tag or null if not found.
   */
  async find(name: string) {
    return await prisma.tag.findUnique({
      where: { name },
    });
  }
}

export const tagService = new TagService();
