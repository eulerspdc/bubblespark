'use server';

import { prisma } from "@/lib/db/prisma";

export const getFunnels = async () => {    
    const funnels = await prisma.funnelCampaign.findMany({
        orderBy: {
        createdAt: "desc",
        },
    });
    return funnels;
}

export const getFunnelById = async (id: string) => {
    const funnel = await prisma.funnelCampaign.findUnique({
        where: {
        id,
        },
    });

    return funnel;
}

export const getFunnelBySlug = async (slug: string) => {
    const funnel = await prisma.funnelCampaign.findUnique({
        where: {
        slug,
        },
    });

    return funnel;
}

export const getFunnelsWithLeadCount = async () => {
    const funnels = await prisma.funnelCampaign.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: { leads: true },
            },
        },
    });

    return funnels.map(funnel => ({
        ...funnel,
        leadCount: funnel._count.leads,
    }));
}

export const createFunnel = async (formData: FormData) => {
    const funnel = await prisma.funnelCampaign.create({
        data: {
        funnelName: formData.get("funnelName") as string,
        slug: (formData.get("funnelName") as string)
        .toLowerCase()
        .replace(/\s+/g, "-"),
        },
    });

    return funnel;
}

export const updateFunnel = async (id: string, formData: FormData) => {
    const funnel = await prisma.funnelCampaign.update({
        where: {
        id,
        },
        data: {
        funnelName: formData.get("funnelName") as string,
        slug: (formData.get("funnelName") as string)
            .toLowerCase()
            .replace(/\s+/g, "-"),
        },
    });

    return funnel;
}

export const deleteFunnel = async (id: string) => {
    const funnel = await prisma.funnelCampaign.delete({
        where: {
        id,
        },
    });

    return funnel;
}

export const countLeads = async (funnelId: string) => {
    const leads = await prisma.lead.count({
        where: {
            campaignId: funnelId,
        },
    });

    return leads;
}